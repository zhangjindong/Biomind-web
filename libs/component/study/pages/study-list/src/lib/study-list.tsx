import { useStudyList } from '@biomind-web/app-study-list';
import { useUserColumns } from '@biomind-web/app-user-setting';
import { StudyTableList } from '@biomind-web/study-ui';
import { SortOrder } from 'antd/es/table/interface';
import intl from 'react-intl-universal';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export function StudyListPage() {
  const navigate = useNavigate();
  const studyList = useStudyList();
  const usercolumns = useUserColumns();
  return (
    <StudyTableList
      onRow={(record) => {
        return {
          onDoubleClick: (event) => {
            sessionStorage.setItem('selectedStudy', record.studyinstanceuid);
            sessionStorage.setItem('selectedRow', JSON.stringify(record));
            navigate('/imageViewer/?studyuid=' + record.studyinstanceuid);
          },
        };
      }}
      columns={[
        {
          key: 'range',
          title: intl.get('range').d('序号'),
          width: 50,
          render: (_text: any, _record: any, index: number) => `${index + 1}`,
          hidden: false,
        },
        {
          key: 'aistatus',
          title: intl.get('aistatus').d('AI'),
          width: 50,
          sorter: true,
          sortDirections: ['descend', 'ascend'] as SortOrder[],
          hidden: false,
        },
        {
          key: 'is_edit',
          title: intl.get('is_edit').d('编辑'),
          width: 50,
          hidden: false,
        },
        {
          key: 'patientid',
          title: intl.get('patientid').d('患者编号'),
          width: 120,
        },
        {
          key: 'patientname',
          title: intl.get('patientname').d('患者姓名'),
          width: 120,
        },
        {
          key: 'patientsex',
          title: intl.get('patientsex').d('性别'),
          width: 120,
        },
        {
          key: 'studydatetime',
          title: intl.get('studydatetime').d('检查时间'),
          width: 120,
        },
        {
          key: 'modality',
          title: intl.get('modality').d('设备类型'),
          width: 120,
        },
        {
          key: 'bodypartexamined',
          title: intl.get('bodypartexamined').d('检查部位'),
          width: 120,
        },
        {
          key: 'studyinstanceuid',
          title: intl.get('studyinstanceuid').d('检查实例号'),
          width: 120,
        },
        {
          key: 'accessionnumber',
          title: intl.get('accessionnumber').d('检查号'),
          width: 120,
        },
        {
          key: 'stationname',
          title: intl.get('stationname').d('设备名称'),
          width: 120,
        },
        {
          key: 'inserttime',
          title: intl.get('inserttime').d('预测请求时间'),
          width: 120,
        },
        {
          key: 'starttime',
          title: intl.get('starttime').d('预测开始时间'),
          width: 120,
        },
        {
          key: 'completiontime',
          title: intl.get('completiontime').d('预测完成时间'),
          width: 120,
        },
        {
          key: 'diagnosis',
          title: intl.get('diagnosis').d('预测结果'),
          width: 120,
        },
        {
          key: 'imagecount',
          title: intl.get('imagecount').d('影像张数'),
          width: 120,
        },
        {
          key: 'patientage',
          title: intl.get('patientage').d('年龄'),
          width: 120,
        },
        {
          key: 'lastbuilddatetime',
          title: intl.get('lastbuilddatetime').d('图像最后更新时间'),
          width: 120,
        },
      ]
        .filter(
          (col) =>
            Object.keys(col).includes('hidden') ||
            usercolumns?.select_columns?.includes(col.key)
        )
        .map((col, index: number, arr) => ({
          ...col,
          dataIndex: col.key,
          ...(Object.keys(col).includes('hidden') ? { sorter: true } : {}),
          ...(Object.keys(usercolumns.sort_columns).includes(col.key)
            ? {
                sortOrder:
                  usercolumns.sort_columns[col.key] === 0
                    ? 'ascend'
                    : 'descend',
              }
            : {}),
          width: arr.length === index + 1 ? undefined : col.width,
        }))}
      dataSource={studyList.study_list}
      pagination={{ total: studyList.total }}
    />
  );
}
