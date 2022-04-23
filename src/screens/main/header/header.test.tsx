import React from 'react';
import { render } from 'configs/test-utils';
import { Header } from './header';

describe('Header', () => {
  it('should match inline snapshot to match styles', () => {
    const wrapper = render(<Header />);
    expect(wrapper).toMatchInlineSnapshot(`
      <View
        style={
          Array [
            Object {
              "backgroundColor": "#615aff",
              "paddingBottom": 16,
              "paddingLeft": 16,
              "paddingRight": 16,
              "paddingTop": 16,
            },
            undefined,
          ]
        }
      >
        <RNCSafeAreaView
          edges={
            Array [
              "top",
            ]
          }
          noStretch={true}
          style={
            Array [
              Object {},
              undefined,
            ]
          }
        >
          <Text
            style={
              Array [
                Object {
                  "color": "#ffffff",
                  "fontSize": 20,
                  "fontWeight": "bold",
                  "lineHeight": 24,
                },
                undefined,
              ]
            }
          >
            NYT News Feed
          </Text>
        </RNCSafeAreaView>
      </View>
    `);
  });
});
