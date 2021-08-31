
import React, { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-layout'
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout'
import Home from 'src/pages/Home'
import defaultProps from './_defaultProps'

export default function Layout () {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true })
    const [pathname, setPathname] = useState('/welcome')
    const history = useHistory()
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                {...defaultProps}
                location={{
                    pathname,
                }}
                waterMarkProps={{
                    content: 'Pro Layout',
                }}
                menuFooterRender={(props) => {
                    return (
                        <a
                            style={{
                                lineHeight: '48rpx',
                                display: 'flex',
                                height: 48,
                                color: 'rgba(255, 255, 255, 0.65)',
                                alignItems: 'center',
                            }}
                            href="https://preview.pro.ant.design/dashboard/analysis"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                alt="pro-logo"
                                src="https://procomponents.ant.design/favicon.ico"
                                style={{
                                    width: 16,
                                    height: 16,
                                    margin: '0 16px',
                                    marginRight: 10,
                                }}
                            />
                            {!props?.collapsed && 'Preview Pro'}
                        </a>
                    )
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                menuItemRender={(item, dom) => (
                    <a
                        onClick={() => {
                            setPathname(item.path || '/welcome')
                            history.push(item.path!)
                        }}
                    >
                        {dom}
                    </a>
                )}
                rightContentRender={() => (
                    <div>
                        <Avatar shape="square" size="small" icon={<UserOutlined />} />
                    </div>
                )}
                {...settings}
            >
                <Switch>
                    <Route path="/admin/sub-page1" component={Home}/>
                </Switch>
            </ProLayout>
            <SettingDrawer
                pathname={pathname}
                getContainer={() => document.getElementById('test-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting)
                }}
                disableUrlParams
            />
        </div>
    )
}
