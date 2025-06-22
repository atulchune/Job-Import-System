import { XMLParser } from 'fast-xml-parser';

export const parseXmlToJson = async (xml) => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    allowBooleanAttributes: true,
  });

  return parser.parse(xml);
};
