const webMap = new Map();

const setMap = (array: any) => {
  if (!array || !Array.isArray(array)) {
    console.warn("setMap called with invalid data:", array);
    return;
  }
  for (let row = 0; row < array.length; row++) {
    webMap.set(array[row][0], array[row][1]);
  }
  console.log("webMap after setMap: ");
  function logMapElements(value: any, key: any) {
    console.log(`setMap siteName[${key}] = ${value}`);
  }
  webMap.forEach(logMapElements);
};

const setStorage = async () => {
  const newArray: any[] = Array.from(webMap);

  console.log("new array:");
  console.table(newArray);

  await chrome.storage.local.clear();
  await chrome.storage.local.set({ key: newArray }).then(() => {
    console.log(`setStorage called.`);
  });
};

const getStorage = async () => {
  const result = await chrome.storage.local.get("key");
  console.log("All storage:", result); // See what's actually stored
  let data = result.key;
  console.log("data:", data);
  console.table(data);
  if (data) {
    setMap(data);
  }
  return data;
};

export { webMap, setStorage, getStorage };
