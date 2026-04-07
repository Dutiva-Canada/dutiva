(function recoverGitHubPagesRoute() {
  const routeParam = "__gh_pages_route";
  const searchParam = "__gh_pages_search";
  const hashParam = "__gh_pages_hash";

  function containsControlCharacters(value) {
    return Array.from(value).some((char) => {
      const code = char.charCodeAt(0);
      return code < 32 || code === 127;
    });
  }

  const params = new URLSearchParams(window.location.search);
  const route = params.get(routeParam);

  if (!route) {
    return;
  }

  if (
    !route.startsWith("/") ||
    route.startsWith("//") ||
    route.includes("\\") ||
    containsControlCharacters(route)
  ) {
    params.delete(routeParam);
    params.delete(searchParam);
    params.delete(hashParam);

    const fallbackSearch = params.toString();
    const fallbackUrl = `${window.location.pathname}${fallbackSearch ? `?${fallbackSearch}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", fallbackUrl);
    return;
  }

  const restored = new URL(route, window.location.origin);
  const restoredSearch = params.get(searchParam);
  const restoredHash = params.get(hashParam);

  if (restoredSearch) {
    restored.search = restoredSearch.startsWith("?") ? restoredSearch : `?${restoredSearch}`;
  }

  if (restoredHash) {
    restored.hash = restoredHash.startsWith("#") ? restoredHash : `#${restoredHash}`;
  }

  window.history.replaceState(null, "", `${restored.pathname}${restored.search}${restored.hash}`);
})();
