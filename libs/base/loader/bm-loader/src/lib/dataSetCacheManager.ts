import { DataSet } from 'dicom-parser';
let cacheSizeInBytes = 0;

let loadedDataSets: Record<string, { dataSet: DataSet; cacheCount: number }> =
  {};

// returns true if the wadouri for the specified index has been loaded
function isLoaded(uri: string): boolean {
  return loadedDataSets[uri] !== undefined;
}

function get(uri: string): DataSet {
  return loadedDataSets[uri]?.dataSet;
}

function update(uri: string, dataSet: DataSet) {
  const loadedDataSet = loadedDataSets[uri];

  if (!loadedDataSet) {
    console.error(`No loaded dataSet for uri ${uri}`);

    return;
  }
  // Update dataset
  cacheSizeInBytes -= loadedDataSet.dataSet.byteArray.length;
  loadedDataSet.dataSet = dataSet;
  cacheSizeInBytes += dataSet.byteArray.length;
}

// loads the dicom dataset from the wadouri sp
function add(uri: string, dataSet: DataSet) {
  loadedDataSets[uri] = {
    dataSet,
    cacheCount: 1,
  };
  cacheSizeInBytes += dataSet.byteArray.length;
}

export function getInfo() {
  return {
    cacheSizeInBytes,
    numberOfDataSetsCached: Object.keys(loadedDataSets).length,
  };
}

// removes all cached datasets from memory
function purge(): void {
  loadedDataSets = {};
  promises = {};
  cacheSizeInBytes = 0;
}

export default {
  isLoaded,
  add,
  getInfo,
  purge,
  get,
  update,
};

export { loadedDataSets };
