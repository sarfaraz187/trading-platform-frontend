export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* <aside className="w-64 bg-gray-100 p-4">
        <ul>
          <li>
            <a href="/user/profile">Profile</a>
          </li>
          <li>
            <a href="/user/settings">Settings</a>
          </li>
        </ul>
      </aside> */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
