import NavBar from "../components/NavBar";
import StatusChart from "../components/StatusChart";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";

import { RadioGroup } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: false },
  { name: "Requests", href: "#", current: true },
  { name: "Assets", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Request() {
  let [isOpen, setIsOpen] = useState(true);
  const people = [
    {
      id: 1,
      name: "Wade Cooper",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Arlene Mccoy",
      avatar:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Devon Webb",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    },
  ];

  const plans = [
    {
      name: "Startup",
      ram: "12GB",
      cpus: "6 CPUs",
      disk: "160 GB SSD disk",
    },
    {
      name: "Business",
      ram: "16GB",
      cpus: "8 CPUs",
      disk: "512 GB SSD disk",
    },
    {
      name: "Enterprise",
      ram: "32GB",
      cpus: "12 CPUs",
      disk: "1024 GB SSD disk",
    },
  ];

  const [selected, setSelected] = useState(plans[0]);
  const [selectedPeople, setSelectedPeople] = useState(people[0]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="min-h-full">
        <NavBar navigation={navigation} user={user} />

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between w-full">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Request
            </h1>
            <div className="">
              <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Create Request
              </button>
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Create Request
                        </Dialog.Title>
                        <div className="mt-2">
                          <form>
                            <div>
                              <div className="my-4">
                                <h3 className="block text-sm font-medium leading-6 text-gray-900">
                                  Assigned to
                                </h3>
                                <Listbox
                                  value={selectedPeople}
                                  onChange={setSelectedPeople}
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="relative mt-2">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                          <span className="flex items-center">
                                            <img
                                              src={selectedPeople.avatar}
                                              alt=""
                                              className="h-5 w-5 flex-shrink-0 rounded-full"
                                            />
                                            <span className="ml-3 block truncate">
                                              {selectedPeople.name}
                                            </span>
                                          </span>
                                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <ChevronUpDownIcon
                                              className="h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </Listbox.Button>

                                        <Transition
                                          show={open}
                                          as={Fragment}
                                          leave="transition ease-in duration-100"
                                          leaveFrom="opacity-100"
                                          leaveTo="opacity-0"
                                        >
                                          <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {people.map((person) => (
                                              <Listbox.Option
                                                key={person.id}
                                                className={({ active }) =>
                                                  classNames(
                                                    active
                                                      ? "bg-indigo-600 text-white"
                                                      : "text-gray-900",
                                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                                  )
                                                }
                                                value={person}
                                              >
                                                {({
                                                  selectedPeople,
                                                  active,
                                                }) => (
                                                  <>
                                                    <div className="flex items-center">
                                                      <img
                                                        src={person.avatar}
                                                        alt=""
                                                        className="h-5 w-5 flex-shrink-0 rounded-full"
                                                      />
                                                      <span
                                                        className={classNames(
                                                          selectedPeople
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                          "ml-3 block truncate"
                                                        )}
                                                      >
                                                        {person.name}
                                                      </span>
                                                    </div>

                                                    {selectedPeople ? (
                                                      <span
                                                        className={classNames(
                                                          active
                                                            ? "text-white"
                                                            : "text-indigo-600",
                                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                      >
                                                        <CheckIcon
                                                          className="h-5 w-5"
                                                          aria-hidden="true"
                                                        />
                                                      </span>
                                                    ) : null}
                                                  </>
                                                )}
                                              </Listbox.Option>
                                            ))}
                                          </Listbox.Options>
                                        </Transition>
                                      </div>
                                    </>
                                  )}
                                </Listbox>
                              </div>
                              <h3 className="block text-sm font-medium leading-6 text-gray-900">
                                Select Transport
                              </h3>

                              <div className="w-full py-4">
                                <div className="mx-auto w-full max-w-md">
                                  <RadioGroup
                                    value={selected}
                                    onChange={setSelected}
                                  >
                                    <RadioGroup.Label className="sr-only">
                                      Server size
                                    </RadioGroup.Label>
                                    <div className="space-y-2">
                                      {plans.map((plan) => (
                                        <RadioGroup.Option
                                          key={plan.name}
                                          value={plan}
                                          className={({ active, checked }) =>
                                            `${
                                              active
                                                ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                                                : ""
                                            }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                          }
                                        >
                                          {({ active, checked }) => (
                                            <>
                                              <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center">
                                                  <div className="text-sm">
                                                    <RadioGroup.Label
                                                      as="p"
                                                      className={`font-medium  ${
                                                        checked
                                                          ? "text-white"
                                                          : "text-gray-900"
                                                      }`}
                                                    >
                                                      {plan.name}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                      as="span"
                                                      className={`inline ${
                                                        checked
                                                          ? "text-sky-100"
                                                          : "text-gray-500"
                                                      }`}
                                                    >
                                                      <span>
                                                        {plan.ram}/{plan.cpus}
                                                      </span>{" "}
                                                      <span aria-hidden="true">
                                                        &middot;
                                                      </span>{" "}
                                                      <span>{plan.disk}</span>
                                                    </RadioGroup.Description>
                                                  </div>
                                                </div>
                                                {checked && (
                                                  <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6" />
                                                  </div>
                                                )}
                                              </div>
                                            </>
                                          )}
                                        </RadioGroup.Option>
                                      ))}
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            Got it, thanks!
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </main>
      </div>
    </>
  );
}
