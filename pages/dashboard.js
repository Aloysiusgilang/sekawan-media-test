import NavBar from "../components/NavBar";
import StatusChart from "../components/StatusChart";
import HistoryChart from "../components/HistoryChart";
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

export default function Dashboard({
  requests,
  transportations,
  supirs,
  fuelConsumption,
}) {
  return (
    <>
      <div className="min-h-full">
        <NavBar navigation={navigation} user={user} />

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <StatusChart requestData={requests} />
            <HistoryChart data={fuelConsumption} />
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
  const fuelConsumption = await prisma.fuelConsumption.findMany();

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
      fuelConsumption: JSON.parse(JSON.stringify(fuelConsumption)),
    },
  };
}
