'use strict';

const alfy = require('alfy');

(async () => {
  const data = await alfy.fetch('https://repo.packagist.org/search.json', {
    query: {
      q: alfy.input
    }
  });

  const formatNumber = number => Number(number).toLocaleString();

  const items = data.results.map(({name, description, repository, url, downloads, favers}) => {
    return {
      title: name,
      subtitle: `${description} — ↓ ${formatNumber(downloads)} / ★ ${formatNumber(favers)}`,
      arg: repository || url,
      mods: {
        alt: {
          arg: url,
          subtitle: 'Open the Packagist page instead of the GitHub repo'
        },
        ctrl: {
          arg: name,
          subtitle: 'Copy package name'
        }
      },
      quicklookurl: repository && `${repository}#readme`
    };
  });

  alfy.output(items);
})();
