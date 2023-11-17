import React from 'react';
import BodyParts from '../components/BodyParts';

export default function AllBodyParts() {
  return <BodyParts text={'오늘 운동 한 분위를 선택해 주세요.'} redirectUrl={'/sports'} />;
}