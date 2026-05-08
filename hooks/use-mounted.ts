"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const useMounted = () =>
  useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
