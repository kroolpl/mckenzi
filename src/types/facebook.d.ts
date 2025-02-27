interface Window {
  fbAsyncInit: () => void;
  FB: {
    init: (options: {
      xfbml?: boolean;
      version?: string;
    }) => void;
  };
} 