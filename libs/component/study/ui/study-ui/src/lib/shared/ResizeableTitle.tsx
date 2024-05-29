import { Resizable, ResizeCallbackData } from 'react-resizable';
import './ResizeableTitle.css';
import { SyntheticEvent, useState } from 'react';
interface ResizeableTitleProps {
  onResize: (e: SyntheticEvent, data: ResizeCallbackData) => void;
  width: number;
  onClick: (...args: unknown[]) => void;
}

export const ResizeableTitle: React.FC<ResizeableTitleProps> = (props) => {
  const { onResize, width, onClick, ...restProps } = props;
  const [resizing, setResizing] = useState(false);

  if (!width) {
    return <th {...restProps} />;
  }

  const onResizeStart = () => {
    setResizing(true);
  };
  const onResizeStop = () => {
    setTimeout(() => {
      setResizing(false);
    });
  };
  return (
    <Resizable
      width={width}
      height={0}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      onResize={onResize}
    >
      <th
        onClick={(...args) => {
          if (!resizing && onClick) {
            onClick(...args);
          }
        }}
        {...restProps}
      />
    </Resizable>
  );
};
