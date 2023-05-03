import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import Confetti from 'react-dom-confetti';

const useConfetti = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const timeout = 5000;

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
      }, timeout);
    }
  }, [showConfetti]);

  const trigger = () => {
    setShowConfetti(true);
  };

  return {
    trigger,
    Confetti: (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            height: 100,
            width: 100
          }}
        >
          <Confetti
            active={showConfetti}
            config={{
              angle: 90,
              spread: 400,
              startVelocity: 30,
              elementCount: 200,
              dragFriction: 0.12,
              duration: timeout,
              stagger: 5,
              width: '15px',
              height: '15px'
            }}
          />
        </Box>
      </Box>
    )
  };
};

export default useConfetti;
