const form = document.querySelector('.form');

form.addEventListener('submit', async function (ev) {
  ev.preventDefault();

  const isPretty = document.getElementById('pretty').checked;

  const tabs = await chrome.tabs.query({ currentWindow: true });

  const tabsInfo = tabs.map(({ title, url }) => ({ title, url }));

  const tabsBlob = new Blob(
    [JSON.stringify(tabsInfo, null, isPretty ? 2 : null)],
    {
      type: 'application/json',
    }
  );

  chrome.downloads.download({
    url: URL.createObjectURL(tabsBlob),
    filename: `${tabsInfo.length}-tabs.json`,
  });
});
