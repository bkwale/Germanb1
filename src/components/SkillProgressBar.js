import React, { useEffect, useState } from 'react';
import './SkillProgressBar.css';
import storageService from '../services/storageService';

export default function SkillProgressBar() {
  const [skillLevel, setSkillLevel] = useState(0);

  useEffect(() => {
    const level = storageService.getSkillLevel();
    setSkillLevel(level);
  }, []);

  // Determine skill level label and color
  const getSkillInfo = (level) => {
    if (level < 20) return { label: 'A1', sublabel: 'Beginner', color: '#FF6B35' }; // Orange-red
    if (level < 40) return { label: 'A1+', sublabel: 'Elementary', color: '#F7931E' }; // Orange
    if (level < 60) return { label: 'A2', sublabel: 'Pre-Intermediate', color: '#FDB913' }; // Amber
    if (level < 80) return { label: 'A2+', sublabel: 'Intermediate', color: '#C5D86D' }; // Yellow-green
    if (level < 95) return { label: 'B1', sublabel: 'Upper-Intermediate', color: '#8BC34A' }; // Light green
    return { label: 'B1+', sublabel: 'Proficient', color: '#4CAF50' }; // Green
  };

  const skillInfo = getSkillInfo(skillLevel);

  // Create gradient based on progress
  const getGradient = (level) => {
    // Gradient goes from orange-red → amber → green
    if (level < 50) {
      // A1 to A2 range: orange-red to amber
      const progress = level * 2; // 0-100 for first half
      return `linear-gradient(to right, #FF6B35 0%, #F7931E ${progress/2}%, #FDB913 ${progress}%, #E0E0E0 ${progress}%)`;
    } else {
      // A2 to B1 range: amber to green
      const progress = (level - 50) * 2; // 0-100 for second half
      return `linear-gradient(to right, #FF6B35 0%, #F7931E 25%, #FDB913 50%, #C5D86D ${50 + progress/4}%, #8BC34A ${50 + progress/2}%, #4CAF50 ${50 + progress}%, #E0E0E0 ${50 + progress}%)`;
    }
  };

  return (
    <div className="skill-progress-container">
      <div className="skill-progress-header">
        <div className="skill-label">
          <span className="skill-level" style={{ color: skillInfo.color }}>
            {skillInfo.label}
          </span>
          <span className="skill-sublabel">{skillInfo.sublabel}</span>
        </div>
        <div className="skill-percentage">{skillLevel}%</div>
      </div>

      <div className="skill-progress-bar">
        <div
          className="skill-progress-fill"
          style={{
            background: getGradient(skillLevel)
          }}
        />
      </div>

      <div className="skill-milestones">
        <div className="milestone" style={{ left: '0%' }}>
          <div className="milestone-dot" style={{ background: skillLevel >= 0 ? '#FF6B35' : '#E0E0E0' }} />
          <div className="milestone-label">A1</div>
        </div>
        <div className="milestone" style={{ left: '50%' }}>
          <div className="milestone-dot" style={{ background: skillLevel >= 50 ? '#FDB913' : '#E0E0E0' }} />
          <div className="milestone-label">A2</div>
        </div>
        <div className="milestone" style={{ left: '100%' }}>
          <div className="milestone-dot" style={{ background: skillLevel >= 100 ? '#4CAF50' : '#E0E0E0' }} />
          <div className="milestone-label">B1</div>
        </div>
      </div>
    </div>
  );
}
