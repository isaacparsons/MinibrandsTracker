const sanitizeString = (str: string) => {
  return str.split('').reduce((result, current) => {
    if (current === "'" || current === '"') {
      return result;
    }
    result.push(current.toLowerCase());
    return result;
  }, [] as string[]);
};

export const doesContainSubstring = (targetString: string, query: string) => {
  if (query.length === 0) {
    return true;
  }

  const sanitizedTargetString = sanitizeString(targetString);
  const sanitizedQuery = sanitizeString(query);

  let queryIndex = 0;
  let startCharIndex = 0;

  while (startCharIndex < sanitizedTargetString.length) {
    if (sanitizedTargetString[startCharIndex] === sanitizedQuery[queryIndex]) {
      while (
        startCharIndex + queryIndex < sanitizedTargetString.length &&
        queryIndex < sanitizedQuery.length &&
        sanitizedTargetString[startCharIndex + queryIndex] ===
          sanitizedQuery[queryIndex]
      ) {
        queryIndex += 1;
      }
      if (queryIndex >= sanitizedQuery.length) {
        return true;
      }
      queryIndex = 0;
    }
    startCharIndex += 1;
  }

  return false;
};
