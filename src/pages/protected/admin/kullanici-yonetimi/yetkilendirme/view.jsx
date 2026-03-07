import * as React from "react";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";

import { DashboardContent } from "src/pages/protected/layout";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export function YetkilendirmeView() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  // Farklı kelimelerden oluşan listeyi başlatmak için useEffect
  React.useEffect(() => {
    const randomLeft = ["Yetki Görüntüleme", "Yetki Düzenleme", "Yetki Silme", "Yeni Yetki Ekleme"];
    const randomRight = [
      "Rapor Görüntüleme",
      "Kullanıcı Ekleme",
      "Kullanıcı Silme",
      "Kullanıcı Düzenleme",
    ];
    setLeft(randomLeft);
    setRight(randomRight);
  }, []);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seçili`}
      />
      <Divider />
      <List
        sx={{
          width: 300,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value, index) => {
          const labelId = `transfer-list-all-item-${index}-label`;

          return (
            <ListItemButton key={index} role="listitem" onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Stack spacing={2} sx={{ mx: "auto", minWidth: { xs: 720, xl: 850 } }}>
      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yetkilendirme"
          links={[{ name: "Anasayfa" }, { name: "Admin Panel" }, { name: "Yetkilendirme" }]}
          sx={{ mb: { xs: 2, md: 3 } }}
        />
        <Card sx={{ p: 1 }}>
          <CardHeader
            title="Yetkilendirme"
            subheader="Buradan rol bazlı yetkilendirme yapabilirsiniz."
            sx={{ mb: 3 }}
          />
          <Divider />
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField name="title" label="Rol" />

            <TextField name="description" label="Açıklama" multiline rows={3} />
          </Stack>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center", mb: 3 }}
          >
            <Grid item>{customList("Yetkiler", left)}</Grid>
            <Grid item>
              <Grid container direction="column" sx={{ alignItems: "center" }}>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList("Atanan Yetkiler", right)}</Grid>
          </Grid>
        </Card>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div>
            <LoadingButton type="submit" variant="contained" size="large" sx={{ ml: 2 }}>
              Yetkilendir
            </LoadingButton>
          </div>
        </Box>
      </DashboardContent>
    </Stack>
  );
}
