import React from "react";
import { Divider } from 'antd'

export default ({orientation, label}) => <Divider style={{ fontSize: '1.125rem', fontWeight: '400', textTransform: 'uppercase', paddingTop: '.5rem', paddingBottom: '.5rem' }} orientation={orientation}>{label}</Divider>