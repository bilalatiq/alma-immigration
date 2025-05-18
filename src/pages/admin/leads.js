import { useState, useEffect } from 'react';

export default function Leads() {
    const [leads, setLeads] = useState([]);
    const [auth, setAuth] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [leadsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        // Mock authentication
        const password = prompt('Enter admin password');
        if (password === 'admin123') {
            setAuth(true);
            // Mock data fetch
            setLeads([
                { name: 'Jorge Ruiz', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Mexico' },
                { name: 'Bahar Zamir', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Mexico' },
                { name: 'Mary Lopez', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Brazil' },
                { name: 'Li Zjin', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'South Korea' },
                { name: 'Mark Antonov', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Russia' },
                { name: 'Jane Ma', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Mexico' },
                { name: 'Anand Jain', submitted: '02/02/2024, 2:45 PM', status: 'Reached Out', country: 'Mexico' },
                { name: 'Anna Voronova', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'France' },
            ]);
        }
    }, []);

    const updateStatus = (index) => {
        const newLeads = [...leads];
        newLeads[index].status = 'Reached Out';
        setLeads(newLeads);
    };

    // Sorting function
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedLeads = [...leads].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setLeads(sortedLeads);
    };

    // Filtering
    const filteredLeads = leads
        .filter((lead) => lead.name.toLowerCase().includes(search.toLowerCase()))
        .filter((lead) => (statusFilter ? lead.status === statusFilter : true));

    // Pagination
    const indexOfLastLead = currentPage * leadsPerPage;
    const indexOfFirstLead = indexOfLastLead - leadsPerPage;
    const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
    const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!auth) return <div className="p-5">Unauthorized</div>;

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-[#f5f7e8] p-6 flex flex-col">
                <div>
                    <img src="/logo.png" alt="almá logo" className="h-8 mb-10" />
                    <nav>
                        <ul className="space-y-4">
                            <li className="text-gray-800 font-semibold">Leads</li>
                            <li className="text-gray-600">Settings</li>
                        </ul>
                    </nav>
                </div>
                <div className="mt-auto pb-2">
                    <div className="flex items-center text-gray-400 text-sm font-medium">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                            <span className="text-gray-600 text-xs font-semibold">A</span>
                        </div>
                        Admin
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">Leads</h1>
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        <option value="">Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Reached Out">Reached Out</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead>
                            <tr className="bg-[#f5f7e8]">
                                <th
                                    className="p-3 text-left border cursor-pointer"
                                    onClick={() => handleSort('name')}
                                >
                                    Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th
                                    className="p-3 text-left border cursor-pointer"
                                    onClick={() => handleSort('submitted')}
                                >
                                    Submitted {sortConfig.key === 'submitted' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th
                                    className="p-3 text-left border cursor-pointer"
                                    onClick={() => handleSort('status')}
                                >
                                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th
                                    className="p-3 text-left border cursor-pointer"
                                    onClick={() => handleSort('country')}
                                >
                                    Country {sortConfig.key === 'country' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                </th>
                                <th className="p-3 text-left border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentLeads.map((lead, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-3 border">{lead.name}</td>
                                    <td className="p-3 border">{lead.submitted}</td>
                                    <td className="p-3 border">{lead.status}</td>
                                    <td className="p-3 border">{lead.country}</td>
                                    <td className="p-3 border">
                                        <button
                                            onClick={() => updateStatus(indexOfFirstLead + index)}
                                            disabled={lead.status === 'Reached Out'}
                                            className={`py-1 px-3 rounded-md text-white ${lead.status === 'Reached Out'
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-black hover:bg-gray-800 transition-colors'
                                                }`}
                                        >
                                            Update Status
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded-md bg-gray-200 disabled:bg-gray-400"
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-3 py-1 border rounded-md ${currentPage === number ? 'bg-black text-white' : 'bg-gray-200'
                                    }`}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded-md bg-gray-200 disabled:bg-gray-400"
                        >
                            &gt;
                        </button>
                    </div>
                    <span>
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={currentPage}
                            onChange={(e) => {
                                const page = Math.max(1, Math.min(totalPages, Number(e.target.value)));
                                setCurrentPage(page);
                            }}
                            className="w-12 p-1 border rounded-md"
                        /> of {totalPages}
                    </span>
                </div>
            </div>
        </div>
    );
}