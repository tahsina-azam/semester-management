import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';

export default function Demo() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="sm"
      >
        {[1,2,3,4,5,6].map(it=><h3>{it}</h3>)}
      </Drawer>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </Group>
    </>
  );
}