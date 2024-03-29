// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma
const { useSyncedState, AutoLayout, SVG, usePropertyMenu } = widget

function Widget() {

  const [checkmark, setCheck] = useSyncedState('checkmark', false);
  const [open, setOpen] = useSyncedState("open", true);
  const [size, setSize] = useSyncedState("size", 80);
  const [color, setColor] = useSyncedState("color", "#2AB514");

  const greentheme = "#2AB514";

  usePropertyMenu(
    open
      ? [
          {
            itemType: 'color-selector',
            propertyName: 'colors',
            tooltip: 'Color',
            selectedOption: color,
            options: [{option: greentheme, tooltip: "Green"}, {option: "#000", tooltip: "Black"} ],
          },
          {
            itemType: 'separator',
          },
          {
            itemType: "dropdown",
            options: [
              { option: "16", label: "XSmall" },
              { option: "25", label: "Small" },
              { option: "40", label: "Medium" },
              { option: "80", label: "Large" },
              { option: "120", label: "XLarge" },
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
      else if (propertyName === "colors") {
        setColor(propertyValue)
      }
    }
  );
  const modifier = size + 10;
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
      width={modifier}
      height={modifier}
      verticalAlignItems={'center'}
      horizontalAlignItems={'center'}
    >
      <AutoLayout
        width={size}
        height={size}
        padding={padding}
        cornerRadius={cornerRadius}
        strokeAlign={'inside'}
        fill={checkmark ? color : '#FFF'}
        stroke={checkmark ? color : '#E6E6E6'}
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
    </AutoLayout>
  )
}

widget.register(Widget)
