interface NetlifyIdentity {
  on: (event: string, callback: (user?: any) => void) => void;
  currentUser: () => any;
}

interface Window {
  netlifyIdentity: NetlifyIdentity;
} 