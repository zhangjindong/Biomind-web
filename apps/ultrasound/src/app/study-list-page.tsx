import { useStudyList } from '@biomind-web/app-study-list';
import { StudyTableList } from '@biomind-web/study-ui';

/* eslint-disable-next-line */
export function StudyListPage() {
  const studyList = useStudyList();
  return (
    <StudyTableList
      columns={[
        {
          title: '序号',
          dataIndex: 'range',
          key: 'range',
          width: 50,
          render: (_text, _record, index: number) => `${index + 1}`,
        },
        {
          title: 'AI',
          dataIndex: 'aistatus',
          width: 50,
          key: 'aistatus',
          sorter: true,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: '编辑',
          dataIndex: 'is_edit',
          key: 'is_edit',
          width: 50,
        },
      ]}
      dataSource={studyList.study_list}
      pagination={{ total: studyList.total }}
    />
  );
}
