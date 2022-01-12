import type { } from '@mui/lab/themeAugmentation';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { Button, Card, CardContent, CardActions, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { PostData, PostList } from 'types/post';
import Iconify from 'src/components/Iconify';
import { Block } from '../Block';
import { quickUpdatePost } from 'data/usePost';

// element editor 
import EditTitle from './EditTitle';
import EditDate from './EditDate';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
};

function EditorElement(props: { data: PostData, cancel: any, postList: PostList }) {
  const { id, author, title, category, tag, createdAt } = props.data;
  const [value, setValue] = useState('1');

  // update target and value 
  const [editThis, setEditThis] = useState('TITLE');
  const [inputValue, setInputValue] = useState<string | undefined>(); // untuk update judul
  // const [inputDate, setInputDate] = useState<string | undefined>();

  const [save, setSave] = useState(false);

  // data-fetching 
  // const updateValue = editThis === 'TITLE' ? inputValue : inputDate;
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateData } = quickUpdatePost({
    save, cacheData: props.postList, toEdit: editThis, postId: id, changeTo: inputValue
  });

  useEffect(() => {
    if (updateData) setSuccess(true);
    if (updateData) setSave(false);
    if (updateData) setLoading(false);
  }, [save, updateData]);

  // untuk transisi tab dan reset input 
  const switchTab = (event: any, newValue: any) => {
    setValue(newValue);
    if (newValue === '1') setEditThis('TITLE');
    if (newValue === '2') setEditThis('DATE');
    setInputValue(undefined);
    // setInputDate(undefined);
  };

  // handle input for update 
  const handleInput = (event: any) => { // title
    setInputValue(event.target.value);
  };
  const handleDate = (val: string) => { // date 
    setInputValue(val);
  }

  // simpan perubahan
  const handleSave = () => {
    setLoading(true);
    setSave(true);
  };
  return (
    <>
      {loading && <div>Tunggu sedang diproses</div>}
      {success &&
        <div> berhasil
          <Button onClick={() => {
            setSave(false);
            setSuccess(false);
            // setLoading(false);
          }}>
            Lanjutkan
          </Button>
          <Button onClick={props.cancel}>
            Tutup
          </Button>
        </div>
      }
      {
        !success && !loading &&
        <Card sx={{ m: 0, p: 2 }}>
          <CardContent
            sx={{
              p: { md: 2 },
              // pl: { md: 1 },
              color: 'grey.800',
            }}
          >
            <Block sx={style}>
              <TabContext value={value}>
                <TabList onChange={switchTab}>
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
                    {editThis === 'TITLE' && <EditTitle
                      handleInput={handleInput}
                      inputValue={inputValue}
                      title={title}
                    />}
                  </TabPanel>
                  <TabPanel value='2'>
                    {editThis === 'DATE' && <EditDate
                      dateValue={createdAt}
                      handleDate={handleDate}
                    />}
                  </TabPanel>
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
        </Card>
      }
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