import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  useBreakpoints,
  TextField,
  Divider,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";

import { Form, json } from "@remix-run/react";
import { request } from "http";
import { db } from "../db.server"
import { useActionData, useLoaderData } from "@remix-run/react";

export async function loader() {
  // provides data to the component

}

export async function action() {
  // updates persistent data
  let setting = await request.formData();
  setting = Object.fromEntries(setting);

  await db.settings.upsert({
    where: {
      id: 1
    },
    update: {
      name: setting.name,
      description: setting.description
    },
    create: {
      name: setting.name,
      description: setting.description
    }
  })

  return json(setting);
}


export default function SettingsPage() {

  const { formValue, setFormValue } = useState({});

  const { smUp } = useBreakpoints();
  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                App Name
              </Text>
              <Text as="p" variant="bodyMd">
                Edit your app name
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="App name"
                  name="app-name"
                  value={formValue?.appName}
                  onChange={(value) => setFormValue({ ...formValue, appName: value })}
                />
                <TextField label="Description" name="description" value={formValue?.description} onChange={(value) => setFormValue({ ...formValue, description: value })} />
                <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
