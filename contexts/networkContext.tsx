import React, { createContext, useContext, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useNetworkStore } from "@/stores/networkStore";
import { selectIsConnected, selectSetNetworkState } from "@/selectors/networkSelectors";

const IsConnectedContext = createContext<boolean>(false);

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
  const isConnected = useNetworkStore(selectIsConnected);
  const setNetworkState = useNetworkStore(selectSetNetworkState);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(setNetworkState);
    
    NetInfo.fetch().then(setNetworkState);

    return () => unsubscribe();
  }, [setNetworkState]);

  return (
    <IsConnectedContext.Provider value={isConnected}>
      {children}
    </IsConnectedContext.Provider>
  );
};

export const useIsConnected = (): boolean => useContext(IsConnectedContext);
