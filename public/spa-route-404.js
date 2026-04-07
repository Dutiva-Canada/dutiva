(function redirectGitHubPagesRoute() {
  var route = window.location.pathname;
  var search = window.location.search ? window.location.search.slice(1) : "";
  var hash = window.location.hash ? window.location.hash.slice(1) : "";
  var redirect = new URL("/", window.location.origin);

  redirect.searchParams.set("__gh_pages_route", route);

  if (search) {
    redirect.searchParams.set("__gh_pages_search", search);
  }

  if (hash) {
    redirect.searchParams.set("__gh_pages_hash", hash);
  }

  window.location.replace(redirect.toString());
})();
