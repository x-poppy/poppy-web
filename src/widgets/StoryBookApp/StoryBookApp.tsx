import React from 'react';
import styles from './StoryBookApp.module.css';

export const StoryBookApp: React.FC = (props) => {
  return <div>{props.children}</div>;
};
