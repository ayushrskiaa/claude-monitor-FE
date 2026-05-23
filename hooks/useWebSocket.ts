'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';

export interface WebSocketEvent {
  id: string;
  tool: string;
  status: 'success' | 'error' | 'flagged' | 'running';
  timestamp: string;
  sessionId: string;
  input?: Record<string, unknown>;
  output?: unknown;
  error?: string;
  duration?: number;
  filePath?: string;
}

interface UseWebSocketOptions {
  serverUrl: string;
  apiKey: string;
  onEvent?: (event: WebSocketEvent) => void;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
}

interface UseWebSocketReturn {
  status: ConnectionStatus;
  events: WebSocketEvent[];
  connect: () => void;
  disconnect: () => void;
  clearEvents: () => void;
  reconnectCount: number;
}

function buildWsUrl(serverUrl: string, apiKey: string): string {
  const base = serverUrl.replace(/\/$/, '');
  const ws = base.replace(/^https/, 'wss').replace(/^http/, 'ws');
  return `${ws}/ws?key=${encodeURIComponent(apiKey)}`;
}

export function useWebSocket({
  serverUrl,
  apiKey,
  onEvent,
  reconnectDelay = 3000,
  maxReconnectAttempts = 8,
}: UseWebSocketOptions): UseWebSocketReturn {
  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [events, setEvents] = useState<WebSocketEvent[]>([]);
  const [reconnectCount, setReconnectCount] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const shouldConnectRef = useRef(false);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptCountRef = useRef(0);
  const onEventRef = useRef(onEvent);

  useEffect(() => {
    onEventRef.current = onEvent;
  });

  const clearTimer = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);

  const attemptConnect = useCallback(() => {
    if (!shouldConnectRef.current) return;
    if (!serverUrl || !apiKey) return;

    setStatus('connecting');
    const wsUrl = buildWsUrl(serverUrl, apiKey);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      if (!shouldConnectRef.current) {
        ws.close();
        return;
      }
      setStatus('connected');
      attemptCountRef.current = 0;
      setReconnectCount(0);
    };

    ws.onmessage = (e: MessageEvent<string>) => {
      try {
        const raw = JSON.parse(e.data) as Partial<WebSocketEvent>;
        const event: WebSocketEvent = {
          id: raw.id ?? crypto.randomUUID(),
          tool: raw.tool ?? 'UNKNOWN',
          status: raw.status ?? 'success',
          timestamp: raw.timestamp ?? new Date().toISOString(),
          sessionId: raw.sessionId ?? 'unknown',
          input: raw.input,
          output: raw.output,
          error: raw.error,
          duration: raw.duration,
          filePath: raw.filePath,
        };
        setEvents(prev => [event, ...prev].slice(0, 1000));
        onEventRef.current?.(event);
      } catch {
        // Ignore malformed messages
      }
    };

    ws.onerror = () => {
      setStatus('error');
    };

    ws.onclose = () => {
      wsRef.current = null;
      if (!shouldConnectRef.current) return;

      attemptCountRef.current += 1;
      setReconnectCount(attemptCountRef.current);

      if (attemptCountRef.current < maxReconnectAttempts) {
        setStatus('disconnected');
        const delay = Math.min(reconnectDelay * Math.pow(1.5, attemptCountRef.current - 1), 30000);
        reconnectTimerRef.current = setTimeout(attemptConnect, delay);
      } else {
        setStatus('error');
      }
    };
  }, [serverUrl, apiKey, reconnectDelay, maxReconnectAttempts]);

  const connect = useCallback(() => {
    if (!serverUrl || !apiKey) return;
    clearTimer();
    if (wsRef.current) wsRef.current.close();

    shouldConnectRef.current = true;
    attemptCountRef.current = 0;
    setReconnectCount(0);
    setEvents([]);
    attemptConnect();
  }, [serverUrl, apiKey, clearTimer, attemptConnect]);

  const disconnect = useCallback(() => {
    shouldConnectRef.current = false;
    clearTimer();
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setStatus('idle');
    setReconnectCount(0);
  }, [clearTimer]);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  useEffect(() => {
    return () => {
      shouldConnectRef.current = false;
      clearTimer();
      wsRef.current?.close();
    };
  }, [clearTimer]);

  return { status, events, connect, disconnect, clearEvents, reconnectCount };
}
