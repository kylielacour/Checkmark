// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma
const { useSyncedState, AutoLayout, SVG, usePropertyMenu } = widget

function Widget() {
  
  const checkSvgSrc = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4763 4.22051C12.7963 4.48358 12.8424 4.95621 12.5793 5.27616L7.64599 11.2762C7.38739 11.5907 6.92509 11.6414 6.60444 11.3905L3.53777 8.99046C3.21158 8.73517 3.15409 8.26379 3.40937 7.9376C3.66466 7.6114 4.13604 7.55391 4.46223 7.8092L6.95234 9.75797L11.4207 4.3235C11.6838 4.00355 12.1564 3.95744 12.4763 4.22051Z" fill="#2AB514"/>
  </svg>
  `;

  const [checkmark, setCheck] = useSyncedState('checkmark', true);
  const [open, setOpen] = useSyncedState("open", true);
  const [size, setSize] = useSyncedState("size", 16);

  usePropertyMenu(
    open
      ? [
          {
            itemType: "dropdown",
            options: [
              { option: "16", label: "Small" },
              { option: "25", label: "Medium" },
              { option: "40", label: "Large" },
            ],
            selectedOption: size.toString(),
            tooltip: "Size",
            propertyName: "size",
          },
        ]
      : [],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "size" && propertyValue) {
        setSize(Number(propertyValue))
      }
    }
  );

  const cornerRadius = size * 0.13;
  const strokeWidth = size * 0.1;
;

  return (
    <AutoLayout
      width={size}
      height={size}
      verticalAlignItems={'center'}
      horizontalAlignItems={'center'}
      padding={0}
      cornerRadius={cornerRadius}
      fill={'#FFFFFF'}
      stroke={'#e6e6e6'}
      strokeAlign={'outside'}
      effect={{
        type: 'inner-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 1.5, y: 1.5 },
        blur: 1,
      }}
      onClick={() => setCheck(!checkmark)}
    >
      <SVG
        src={checkSvgSrc}
        width={'fill-parent'}
        height={'fill-parent'}
        hidden={!checkmark}
        strokeWidth={strokeWidth}
        
      ></SVG>
    </AutoLayout>
  )
}

widget.register(Widget)
