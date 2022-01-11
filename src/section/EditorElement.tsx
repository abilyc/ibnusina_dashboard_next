// When using TypeScript 4.x and above
import type { } from '@mui/lab/themeAugmentation';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, Card, CardContent, CardActions, Box, Tab, Tabs, CardHeader, Container } from '@mui/material';
import { TabContext, TabList, TabPanel, Masonry } from '@mui/lab';
import { PostData, PostList } from 'types/post';
import Iconify from 'src/components/Iconify';
import { Block } from './Block';
import { quickUpdatePost } from 'data/usePost';

const style = {
  display: 'flex',
  // outerWidth: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
};

function EditorElement(props: { data: PostData, cancel: any, postList: PostList }) {
  const { id, author, title, category, tag, createdAt } = props.data;
  const [value, setValue] = useState('1');
  const [inputValue, setInputValue] = useState();
  const [save, setSave] = useState(false);
  const [success, setSuccess] = useState(false);
  const { updateData } = quickUpdatePost({ save, cacheData: props.postList, toEdit: "TITLE", postId: id, changeTo: inputValue });

  useEffect(() => {
    if (updateData) setSuccess(true);
    if (updateData) setSave(false);
  }, [save, updateData]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    setInputValue(undefined);
  };
  const handleInput = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleSave = () => {
    setSave(true);
  };
  
  return (
    <>
      {success ? <div>berhasil</div>: <Card sx={{ m: 0, p: 2 }}>
        {/* <CardHeader
          title= {`Edit  ${props.data.author}`}
        /> */}
        <CardContent
          sx={{
            p: { md: 2 },
            // pl: { md: 1 },
            color: 'grey.800',
          }}
        >
          <Block sx={style}>
            <TabContext value={value}>
              <TabList onChange={handleChange}>
                {EDITOR_TAB.map((tab, index) => (
                  <Tab key={tab.value} icon={tab.icon} label={tab.label} value={String(index + 1)} />
                ))}
              </TabList>
              <Box
                sx={{
                  p: 2,
                  mt: 2,
                  height: 80,
                  width: '100%',
                  borderRadius: 1,
                  bgcolor: 'grey.50012',
                }}
              >
                <TabPanel value='1'>
                  <div>
                    <TextField
                      id="filled-helperText"
                      fullWidth={true}
                      label="Ubah judul"
                      defaultValue={!inputValue ? title : inputValue}
                      onChange={handleInput}
                      // helperText="Some important text"
                      variant="outlined"
                    />
                  </div>
                </TabPanel>
                <TabPanel value='2'>hello</TabPanel>
                <TabPanel value='3'>hello</TabPanel>
                <TabPanel value='4'>hello</TabPanel>
                <TabPanel value='5'>hello</TabPanel>
                <TabPanel value='6'>hello</TabPanel>
              </Box>
            </TabContext>
          </Block>
        </CardContent>
        <CardActions sx={{ pt: 0, pb: 0 }}>
          <Button size="small" onClick={handleSave}>Simpan</Button>
          <Button size="small" onClick={props.cancel}>Batal</Button>
        </CardActions>
      </Card>}
    </>
  )
}

const EDITOR_TAB = [
  {
    value: '1',
    icon: <Iconify icon="eva:phone-call-fill" width={24} height={24} sx={undefined} />,
    label: 'Judul',
    disabled: false,
  },
  {
    value: '2',
    icon: <Iconify icon="eva:heart-fill" width={24} height={24} sx={undefined} />,
    label: 'Tanggal',
    disabled: false,
  },
  {
    value: '3',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} sx={undefined} />,
    label: 'Penulis',
    disabled: true,
  },
  {
    value: '4',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} sx={undefined} />,
    label: 'Kategori',
    disabled: true,
  },
  {
    value: '5',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} sx={undefined} />,
    label: 'Tag',
    disabled: true,
  },
  {
    value: '6',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} sx={undefined} />,
    label: 'Deskripsi',
    disabled: true,
  },
];
export default EditorElement