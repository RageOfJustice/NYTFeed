import React from 'react';
import { StyleSheet } from 'react-native';
import { render, RenderAPI } from 'configs/test-utils';
import { Button } from './button';
import { theme } from 'theme';

describe('Button', () => {
  it('should match snapshot to match styles', () => {
    const wrapper = render(<Button title="test" />);
    expect(wrapper).toMatchInlineSnapshot(`
      <View
        accessibilityRole="button"
        accessible={true}
        collapsable={false}
        focusable={false}
        onClick={[Function]}
        onResponderGrant={[Function]}
        onResponderMove={[Function]}
        onResponderRelease={[Function]}
        onResponderTerminate={[Function]}
        onResponderTerminationRequest={[Function]}
        onStartShouldSetResponder={[Function]}
        style={
          Object {
            "borderBottomColor": "#6a6b6b",
            "borderBottomLeftRadius": 4,
            "borderBottomRightRadius": 4,
            "borderBottomWidth": 1,
            "borderLeftColor": "#6a6b6b",
            "borderLeftWidth": 1,
            "borderRightColor": "#6a6b6b",
            "borderRightWidth": 1,
            "borderTopColor": "#6a6b6b",
            "borderTopLeftRadius": 4,
            "borderTopRightRadius": 4,
            "borderTopWidth": 1,
            "opacity": 1,
            "paddingBottom": 6,
            "paddingLeft": 6,
            "paddingRight": 6,
            "paddingTop": 6,
          }
        }
      >
        <Text
          style={
            Array [
              Object {
                "color": "#6a6b6b",
                "fontSize": 12,
                "lineHeight": 14,
                "textAlign": "center",
              },
              undefined,
            ]
          }
        >
          test
        </Text>
      </View>
    `);
  });

  it('should change colors when selected=true', () => {
    const wrapper = render(<Button title="test" />);
    const checkIfSelected = (wrapper: RenderAPI): boolean => {
      const button = wrapper.getByA11yRole('button');
      const text = wrapper.getByText('test');

      const buttonStyle = StyleSheet.flatten(button.props.style);
      const textStyle = StyleSheet.flatten(text.props.style);

      const {
        borderTopColor,
        borderRightColor,
        borderBottomColor,
        borderLeftColor,
      } = buttonStyle;
      for (const color of [
        borderTopColor,
        borderRightColor,
        borderBottomColor,
        borderLeftColor,
      ]) {
        if (color !== theme.colors.buttonSelected) return false;
      }
      return textStyle.color === theme.colors.buttonSelected;
    };
    expect(checkIfSelected(wrapper)).toBeFalsy();
    wrapper.update(<Button selected title="test" />);
    expect(checkIfSelected(wrapper)).toBeTruthy();
  });
});
