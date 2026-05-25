"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Returns whether a client component has mounted to avoid hydration mismatch.
 */
export const useMounted = () =>
  useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
