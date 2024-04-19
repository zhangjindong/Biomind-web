import { CreateAPIMethod } from '@biomind-web/utils';
import { StudyList, StudyListRequest } from '@biomind-web/study-info';

/**
 * API ListViewer StudyList
 */
export const apiStudyList = CreateAPIMethod<StudyListRequest, StudyList>({
  method: 'POST',
  url: '/apiv3/listviewer/study/list/',
});
