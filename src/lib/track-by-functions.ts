const _onMissingHandler = (item: any, property: string) =>
  console.warn(item, property);

const by = (property: string, onMissingHandler?: any): any => {
  return (_index: number, item: any) => {
    const id = item[property];

    if (!id) {
      (onMissingHandler || _onMissingHandler)(item, property);
    }

    return id;
  };
};

export const trackByFunctions = {
  by,
  byIndex: (index: number) => index,
  byId: by('id'),
  byKey: by('key'),
  byValue: by('value'),
};
