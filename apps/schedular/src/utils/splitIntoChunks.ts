/**
 * 
 * @param array 
 * @param chunkCount -number of partitions  
 * @returns array of arrays 
 */
export function splitIntoChunks<T>(array: T[], chunkCount: number): T[][] {
    const result: T[][] = Array.from({ length: chunkCount }, () => []);
    const chunkSize = Math.floor(array.length / chunkCount);
    let remainder = array.length % chunkCount;
  
    let startIndex = 0;
  
    for (let i = 0; i < chunkCount; i++) {
      const currentChunkSize = chunkSize + (remainder > 0 ? 1 : 0);
      result[i] = array.slice(startIndex, startIndex + currentChunkSize);
      startIndex += currentChunkSize;
      if (remainder > 0) remainder--;
    }

    return result.filter((chunk) => chunk.length > 0);
}
  