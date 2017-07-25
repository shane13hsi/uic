import * as React from 'react';
import { Col, Collapse, Popover, Row } from '../antd/antd';
import styled from 'styled-components';

const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

/**
 * Popover 接受一个参数控制相对位移（left, top）
 */
export class ComponentsList extends React.Component<{}, {}> {
  render() {
    return (
      <Wrapper>
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="General" key="1">
            <p>
              <Row gutter={24}>
                <Col span={6}>
                  <Popover mouseEnterDelay={0.5} placement="right" content={content} title="Title">
                    <div dangerouslySetInnerHTML={
                      (() => ({
                        __html: '<svg style="width: 36px; height: 36px; display: block; position: relative; overflow: hidden; cursor: move; left: 2px; top: 2px;"><g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="2" y="10" width="31" height="16" fill="#ffffff" stroke="#000000" pointer-events="all"></rect></g></g><g></g><g></g></g></svg>'
                      }))()
                    }/>
                  </Popover>
                </Col>
                <Col span={6}>
                  <Popover mouseEnterDelay={0.5} placement="right" content={content} title="Title">
                    <div dangerouslySetInnerHTML={
                      (() => ({
                        __html: '<svg style="width: 36px; height: 36px; display: block; position: relative; overflow: hidden; cursor: move; left: 2px; top: 2px;"><g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 6 9 C 6 0 30 0 30 9 L 30 27 C 30 36 6 36 6 27 Z" fill="#ffffff" stroke="#000000" stroke-miterlimit="10" pointer-events="all"></path><path d="M 6 9 C 6 15 30 15 30 9" fill="none" stroke="#000000" stroke-miterlimit="10"></path></g></g><g></g><g></g></g></svg>'
                      }))()
                    }/>
                  </Popover>
                </Col>
                <Col span={6}>
                  <Popover mouseEnterDelay={0.5} placement="right" content={content} title="Title">
                    <div dangerouslySetInnerHTML={
                      (() => ({
                        __html: '<svg style="width: 36px; height: 36px; display: block; position: relative; overflow: hidden; cursor: move; left: 2px; top: 2px;"><g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="2" y="2" width="31" height="31" fill="#ffffff" stroke="#000000" pointer-events="all"></rect><path d="M 2 10 L 34 10" fill="none" stroke="white" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden" stroke-width="9"></path><path d="M 2 10 L 34 10" fill="none" stroke="#000000" stroke-miterlimit="10"></path><path d="M 10 2 L 10 34" fill="none" stroke="white" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden" stroke-width="9"></path><path d="M 10 2 L 10 34" fill="none" stroke="#000000" stroke-miterlimit="10"></path></g></g><g></g><g></g></g></svg>'
                      }))()
                    }/>
                  </Popover>
                </Col>
                <Col span={6}>
                  <Popover mouseEnterDelay={0.5} placement="right" content={content} title="Title">
                    <div dangerouslySetInnerHTML={
                      (() => ({
                        __html: '<svg style="width: 36px; height: 36px; display: block; position: relative; overflow: hidden; cursor: move; left: 2px; top: 2px;"><g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="18" cy="6" rx="3.9000000000000004" ry="3.9000000000000004" fill="#ffffff" stroke="#000000" pointer-events="all"></ellipse><path d="M 18 10 L 18 23 M 18 12 L 10 12 M 18 12 L 25 12 M 18 23 L 10 33 M 18 23 L 25 33" fill="none" stroke="white" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden" stroke-width="9"></path><path d="M 18 10 L 18 23 M 18 12 L 10 12 M 18 12 L 25 12 M 18 23 L 10 33 M 18 23 L 25 33" fill="none" stroke="#000000" stroke-miterlimit="10"></path></g></g><g></g><g></g></g></svg>'
                      }))()
                    }/>
                  </Popover>
                </Col>
              </Row>
            </p>
          </Panel>
          <Panel header="Navigation" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="Date Entry" key="3">
            <p>{text}</p>
          </Panel>
          <Panel header="Date Display" key="4">
            <p>{text}</p>
          </Panel>
          <Panel header="Feedback" key="5">
            <p>{text}</p>
          </Panel>
          <Panel header="Other" key="6">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`// styled
  & {
    height: 100%;
    overflow: auto;
  }
`;
