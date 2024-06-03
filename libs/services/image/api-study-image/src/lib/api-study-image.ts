import { StudyImages, StudyImagesRequest } from '@biomind-web/study-images';
import { CreateAPIMethod } from '@biomind-web/utils';

/**
 * API ImageViewer StudyImages
 */
export const apiStudyImages = CreateAPIMethod<StudyImagesRequest, StudyImages>({
  method: 'GET',
  url: '/apiv3/pacs/study_images/',
});
