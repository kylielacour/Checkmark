// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma
const { useSyncedState, AutoLayout, SVG, usePropertyMenu } = widget

function Widget() {

  const [checkmark, setCheck] = useSyncedState('checkmark', false);
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
  const strokeWidth = size * 0.13;
  const padding = size * 0.16;
;

  const innerShadow: WidgetJSX.Effect = {
    type: 'inner-shadow',
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 1.5, y: 1.5 },
    blur: 2,
  }

  const noShadow: WidgetJSX.Effect = {
    type: 'inner-shadow',
    color: { r: 0, g: 0, b: 0, a: 0 },
    offset: { x: 1.5, y: 1.5 },
    blur: 2,
  }

  const checkSvgSrc = `
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4.3998L4.06667 6.7998L9 0.799805" stroke="#FFF" stroke-width="${strokeWidth}" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>
  `;

  return (
    <AutoLayout
      width={size}
      height={size}
      verticalAlignItems={'center'}
      horizontalAlignItems={'center'}
      padding={padding}
      cornerRadius={cornerRadius}
      strokeAlign={'inside'}
      fill={checkmark ? '#2AB514' : '#FFF'}
      stroke={checkmark ? '#2AB514' : '#E6E6E6'}
      effect={checkmark ? noShadow : innerShadow}
      onClick={() => setCheck(!checkmark)}
    >
    <SVG
      src={checkSvgSrc}
      width={'fill-parent'}
      height={'fill-parent'}
      hidden={!checkmark}
    />
    </AutoLayout>
  )
}

widget.register(Widget)
