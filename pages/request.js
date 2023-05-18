import NavBar from "../components/NavBar";
import StatusChart from "../components/StatusChart";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RadioGroup } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import prisma from "../lib/prisma";

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

export default function Request({ requests, transportations, supirs }) {
  let [isOpen, setIsOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const transportation = transportations;

  const people = supirs;

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
  const [selectedPeopleLv1, setSelectedPeopleLv1] = useState(people[0]);
  const [selectedPeopleLv2, setSelectedPeopleLv2] = useState(people[0]);
  const [selectedSupir, setSelectedSupir] = useState(people[0]);
  const [selectedTransportation, setSelectedTransportation] = useState(
    transportation[0]
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleApprovalRequest = async (id, status) => {
    try {
      const response = await fetch("/api/addRequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
      // Handle error, e.g., show an error message
    }
  };

  const handleRequest = async (e) => {
    const formData = {
      createdById: 1,
      date: selectedDate,
      status: "Pending",
      supirId: selectedSupir.id,
      transportationId: selectedTransportation.id,
      approvals: [
        {
          userId: 1,
          status: "Pending",
        },
        {
          userId: 2,
          status: "Pending",
        },
      ],
    };
    try {
      const response = await fetch("/api/addRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      throw new Error("Failed to create request");
    }

    closeModal();
  };

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
          <div>
            <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
              {requests.map((request) => (
                <div
                  className="px-4 shadow rounded-lg sm:px-6 md:px-8 pt-5 pb-11 mx-2 w-full sm:border-r border-gray-200"
                  key={request.id}
                >
                  <div className="rounded border-gray-300  dark:border-gray-700 ">
                    <div className="sm:flex flex-col justify-between">
                      <div>
                        <p className="text-base font-bold leading-none text-gray-800">
                          {request.transportation.merk} request
                        </p>
                        <p className="text-xs leading-3 text-gray-600 mt-2">
                          as for {new Date(request.createdAt).toDateString()}
                        </p>
                      </div>
                      <div className="mt-8 sm:mt-4 flex gap-x-8 ">
                        {request.approval.map((approval, index) => {
                          let statusBadge = null;
                          if (approval.status === "approved") {
                            statusBadge = (
                              <span
                                key={approval.id}
                                className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                              >
                                Approved
                              </span>
                            );
                          } else if (approval.status === "denied") {
                            statusBadge = (
                              <span
                                key={approval.id}
                                className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
                              >
                                Denied
                              </span>
                            );
                          } else {
                            statusBadge = (
                              <span
                                key={approval.id}
                                className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
                              >
                                Pending
                              </span>
                            );
                          }

                          return (
                            <p key={approval.id} className=" text-xs py-1">
                              Level {index + 1}: {statusBadge}
                            </p>
                          );
                        })}
                      </div>

                      <div className="mt-8 sm:mt-4 text-gray-700 text-xs">
                        <p className=" font-normal">
                          Driver : {request.supir.name}
                        </p>
                        <p className=" font-normal">
                          Driver status: {request.supir.status}
                        </p>
                        <p className=" font-normal">
                          Transportation type : {request.transportation.type}
                        </p>
                        <p className=" font-normal">
                          Transportation status :{" "}
                          {request.transportation.status}
                        </p>
                      </div>

                      <div className="mt-4 flex gap-x-4">
                        <button
                          onClick={() =>
                            handleApprovalRequest(request.id, "accept")
                          }
                          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleApprovalRequest(request.id, "decline")
                          }
                          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                                  Assigned lvl 1 approval
                                </h3>
                                <Listbox
                                  value={selectedPeopleLv1}
                                  onChange={setSelectedPeopleLv1}
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="relative mt-2">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                          <span className="flex items-center">
                                            <img
                                              src={selectedPeopleLv1.avatar}
                                              alt=""
                                              className="h-5 w-5 flex-shrink-0 rounded-full"
                                            />
                                            <span className="ml-3 block truncate">
                                              {selectedPeopleLv1.name}
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
                                                  selectedPeopleLv1,
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
                                                          selectedPeopleLv1
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                          "ml-3 block truncate"
                                                        )}
                                                      >
                                                        {person.name}
                                                      </span>
                                                    </div>

                                                    {selectedPeopleLv1 ? (
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
                              <div className="my-4">
                                <h3 className="block text-sm font-medium leading-6 text-gray-900">
                                  Assigned lvl 2 approval
                                </h3>
                                <Listbox
                                  value={selectedPeopleLv2}
                                  onChange={setSelectedPeopleLv2}
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="relative mt-2">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                          <span className="flex items-center">
                                            <img
                                              src={selectedPeopleLv2.avatar}
                                              alt=""
                                              className="h-5 w-5 flex-shrink-0 rounded-full"
                                            />
                                            <span className="ml-3 block truncate">
                                              {selectedPeopleLv2.name}
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
                                                  selectedPeopleLv2,
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
                                                          selectedPeopleLv2
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                          "ml-3 block truncate"
                                                        )}
                                                      >
                                                        {person.name}
                                                      </span>
                                                    </div>

                                                    {selectedPeopleLv2 ? (
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
                                  <Listbox
                                    value={transportation}
                                    onChange={setSelectedTransportation}
                                  >
                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                      {selectedTransportation.type}
                                    </Listbox.Button>
                                    <Listbox.Options
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-900",
                                          "relative cursor-default select-none py-2 pl-3 pr-9"
                                        )
                                      }
                                    >
                                      {transportation.map((transportation) => (
                                        <Listbox.Option
                                          key={transportation.id}
                                          value={transportation}
                                          disabled={transportation.unavailable}
                                        >
                                          {transportation.merk} :{" "}
                                          {transportation.type}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Listbox>
                                </div>
                              </div>
                              <div className="my-4">
                                <h3 className="block text-sm font-medium leading-6 text-gray-900">
                                  Assigned Driver
                                </h3>
                                <Listbox
                                  value={selectedSupir}
                                  onChange={setSelectedSupir}
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="relative mt-2">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                          <span className="flex items-center">
                                            <img
                                              src={selectedSupir.avatar}
                                              alt=""
                                              className="h-5 w-5 flex-shrink-0 rounded-full"
                                            />
                                            <span className="ml-3 block truncate">
                                              {selectedSupir.name}
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
                                                  selectedSupir,
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
                                                          selectedPeopleLv1
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                          "ml-3 block truncate"
                                                        )}
                                                      >
                                                        {person.name}
                                                      </span>
                                                    </div>

                                                    {selectedSupir ? (
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

                              <div className="mt-4">
                                <h3 className="block text-sm font-medium leading-6 text-gray-900">
                                  Select Date
                                </h3>

                                <DatePicker
                                  selected={selectedDate}
                                  onChange={(date) => setSelectedDate(date)}
                                />
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => handleRequest()}
                          >
                            Create Request
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

export async function getStaticProps(context) {
  const requests = await prisma.request.findMany();
  const supirs = await prisma.supir.findMany();
  const transportations = await prisma.transportation.findMany();

  for (let i = 0; i < requests.length; i++) {
    // get transpotation data by id
    const transportation = await prisma.transportation.findUnique({
      where: {
        id: requests[i].transportationId,
      },
    });

    const supir = await prisma.supir.findUnique({
      where: {
        id: requests[i].supirId,
      },
    });

    const approval = await prisma.approval.findMany({
      where: {
        requestId: requests[i].id,
      },
    });

    // append transpotation and supir data to requests
    requests[i].transportation = transportation;
    requests[i].supir = supir;
    requests[i].approval = approval;
  }

  console.log(requests);

  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests)),
      supirs: JSON.parse(JSON.stringify(supirs)),
      transportations: JSON.parse(JSON.stringify(transportations)),
    },
  };
}
