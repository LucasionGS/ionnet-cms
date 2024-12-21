import "./App.scss"
import React, { useState } from "react"
// @ts-expect-error
import reactLogo from "./assets/react.svg"
import { AppShell, Button, Input, Stack, Table, TextInput } from "@mantine/core";
import { useEffect } from "react";
import User from "../../shared/User";
import { useTransition } from "react";

function App() {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [tableItems, setTableItems] = useState<string[]>([]);

  useEffect(() => {
    startTransition(() => {
      setTableItems(
        Array.from({ length: 1000 }, (_, index) => index)
        .map(index => `Blog post ${index + 1}`)
        .filter(index => index.toString().includes(search))
      );
    });
  }, [search]);
  
  return (
    <AppShell
      header={{
        height: 60
      }}

      navbar={{
        width: 200,
        breakpoint: "xs"
      }}
    >
      <AppShell.Header className="
        bg-cream text-black
        dark:bg-black dark:text-white
        py-2">
        <div className="flex items-center justify-between h-full px-10">
          <div className="flex items-center">
            <img src={reactLogo} alt="React logo" className="h-10" />
            <h1 className="ml-5 text-xl">
              Ionnet CMS
            </h1>
          </div>
          <div className="flex items-center">
            <button>Button</button>
          </div>
        </div>
      </AppShell.Header>
      
      <div className="flex md:flex-row flex-col">
        <AppShell.Navbar className="bg-gray-100 dark:bg-gray-800">
          <Stack gap={0}>
            <Button size="compact-lg" variant="light">Content</Button>
            <Button size="compact-lg" variant="light">Structure</Button>
            <Button size="compact-lg" variant="light">Analytics</Button>
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main>
          <div className="p-5">
            <h2 className="text-2xl">Content</h2>
            <p>
              {user && `Hello, ${user.name}!`}
            </p>

            <Table striped className="mt-5" style={{
              tableLayout: "fixed"
            }} withTableBorder stickyHeader stickyHeaderOffset={60}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <TextInput
                      value={search}
                      onChange={event => setSearch(event.target.value)}
                      placeholder="Search"
                      className="w-full"
                    />
                  </Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Author</Table.Th>
                  <Table.Th>Created</Table.Th>
                  <Table.Th>Updated</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {isPending &&
                  <Table.Tr>
                    <Table.Td colSpan={5}>Loading...</Table.Td>
                  </Table.Tr>
                }

                {tableItems.map((title, index) => (
                  <Table.Tr>
                  <Table.Td>{title}</Table.Td>
                  <Table.Td>Article</Table.Td>
                  <Table.Td>John Doe</Table.Td>
                  <Table.Td>2021-12-01</Table.Td>
                  <Table.Td>2021-12-01</Table.Td>
                </Table.Tr>
              ))}
                
              </Table.Tbody>
            </Table>
          </div>
        </AppShell.Main>
      </div>
    </AppShell>
  )
}

function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setUser(new User(data.user.name, data.user.email, data.user.password, data.user.id))
      });
  }, []);
  
  return {
    user,
    setUser
  }
}

export default App
