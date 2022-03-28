import isEmpty from 'lodash/isEmpty';

import isSingleRelation from './isSingleRelation';
import isFieldTypeNumber from '../../../../utils/isFieldTypeNumber';

export default function hasContent(type, content, metadatas, fieldSchema) {
  if (type === 'component') {
    const {
      mainField: { name: mainFieldName, type: mainFieldType },
    } = metadatas;

    // Repeatable fields show the ID as fallback, in case the mainField
    // doesn't have any content
    if (fieldSchema?.repeatable) {
      return content.length > 0;
    }

    const value = content[mainFieldName];

    if (isFieldTypeNumber(mainFieldType) && mainFieldName !== 'id') {
      return !Number.isNaN(value);
    }

    return !isEmpty(value);
  }

  if (type === 'relation') {
    if (isSingleRelation(fieldSchema.relation)) {
      return !isEmpty(content);
    }

    return content.count > 0;
  }

  if (isFieldTypeNumber(type)) {
    return !Number.isNaN(content);
  }

  return !isEmpty(content);
}
