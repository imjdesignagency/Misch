import React from 'react';
import { Edit3 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { CMSSectionKey } from '../../types/cms';

interface CMSEditBadgeProps {
  sectionKey: CMSSectionKey;
  label?: string;
  className?: string;
}

export const CMSEditBadge: React.FC<CMSEditBadgeProps> = () => {
  return null;
};
