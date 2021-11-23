const btn = document.querySelector('button');

btn.addEventListener('click', async (ev) => {
  const tabs = await chrome.tabs.query({ currentWindow: true });

  const tabsInfo = tabs.map(({ title, url }) => ({ title, url }));

  const blob = new Blob(
    [
      new Blob([JSON.stringify(tabsInfo, null, 2)], {
        type: 'application/json',
      }),
    ],
    { type: 'application/json' }
  );

  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url,
    filename: `${tabsInfo.length}-tabs.json`,
  });
});
