"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  UserCheck, 
  CreditCard,
  
  Star,
  Activity,
  ArrowUpRight,
  
} from 'lucide-react';

// Dummy data for dashboard
const monthlyRevenue = [
  { month: 'Jan', subscriptions: 12500, interviews: 8300, total: 20800 },
  { month: 'Feb', subscriptions: 15200, interviews: 9800, total: 25000 },
  { month: 'Mar', subscriptions: 18700, interviews: 12400, total: 31100 },
  { month: 'Apr', subscriptions: 22300, interviews: 15600, total: 37900 },
  { month: 'May', subscriptions: 28900, interviews: 18900, total: 47800 },
  { month: 'Jun', subscriptions: 32100, interviews: 21300, total: 53400 }
];

const userGrowth = [
  { month: 'Jan', companies: 45, interviewers: 78 },
  { month: 'Feb', companies: 67, interviewers: 94 },
  { month: 'Mar', companies: 89, interviewers: 112 },
  { month: 'Apr', companies: 134, interviewers: 148 },
  { month: 'May', companies: 156, interviewers: 186 },
  { month: 'Jun', companies: 198, interviewers: 234 }
];

const subscriptionDistribution = [
  { name: 'Basic Plan', value: 45, color: '#8b5cf6' },
  { name: 'Pro Plan', value: 89, color: '#a78bfa' },
  { name: 'Enterprise Plan', value: 34, color: '#c4b5fd' },
  { name: 'Free Trial', value: 28, color: '#e9d5ff' }
];

const recentCompanies = [
  { id: '1', name: 'TechCorp Inc.', email: 'admin@techcorp.com', plan: 'Enterprise', status: 'active', joinedAt: '2024-01-15' },
  { id: '2', name: 'StartupXYZ', email: 'hr@startupxyz.com', plan: 'Pro', status: 'active', joinedAt: '2024-01-14' },
  { id: '3', name: 'Global Solutions', email: 'contact@global.com', plan: 'Basic', status: 'pending', joinedAt: '2024-01-13' },
  { id: '4', name: 'InnovateLab', email: 'team@innovate.com', plan: 'Pro', status: 'active', joinedAt: '2024-01-12' },
  { id: '5', name: 'FutureTech', email: 'info@future.com', plan: 'Enterprise', status: 'active', joinedAt: '2024-01-11' }
];

const topInterviewers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', rating: 4.9, expertise: 'React, Node.js', interviews: 45 },
  { id: '2', name: 'Mike Chen', email: 'mike@email.com', rating: 4.8, expertise: 'Python, ML', interviews: 38 },
  { id: '3', name: 'Emily Davis', email: 'emily@email.com', rating: 4.7, expertise: 'Java, Spring', interviews: 42 },
  { id: '4', name: 'Alex Wilson', email: 'alex@email.com', rating: 4.9, expertise: 'DevOps, AWS', interviews: 51 },
  { id: '5', name: 'Lisa Brown', email: 'lisa@email.com', rating: 4.6, expertise: 'Mobile Dev', interviews: 29 }
];

const recentTransactions = [
  { id: '1', company: 'TechCorp Inc.', amount: 2500, type: 'Interview Payment', status: 'PAID', date: '2024-01-15' },
  { id: '2', company: 'StartupXYZ', amount: 599, type: 'Subscription', status: 'PAID', date: '2024-01-14' },
  { id: '3', company: 'Global Solutions', amount: 1200, type: 'Interview Payment', status: 'PENDING', date: '2024-01-14' },
  { id: '4', company: 'InnovateLab', amount: 299, type: 'Subscription', status: 'PAID', date: '2024-01-13' },
  { id: '5', company: 'FutureTech', amount: 3200, type: 'Interview Payment', status: 'PAID', date: '2024-01-13' }
];

 const AdminDashboard = () => {
  const totalRevenue = monthlyRevenue[monthlyRevenue.length - 1]?.total || 0;
  const totalCompanies = userGrowth[userGrowth.length - 1]?.companies || 0;
  const totalInterviewers = userGrowth[userGrowth.length - 1]?.interviewers || 0;
  const totalSubscriptions = subscriptionDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="custom-64 min-h-screen bg-gradient-to-br from-black via-black to-violet-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 animate-in fade-in duration-1000">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-violet-300 text-xl max-w-2xl mx-auto">
            Comprehensive overview of your interview platform performance
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom duration-700 delay-200">
          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-violet-200 group-hover:text-violet-100 transition-colors">
                Total Revenue
              </CardTitle>
              <div className="p-2 bg-violet-600/20 rounded-lg group-hover:bg-violet-600/30 transition-colors">
                <DollarSign className="h-5 w-5 text-violet-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400 font-medium">+12.5%</span>
                <span className="text-violet-400 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-violet-200 group-hover:text-violet-100 transition-colors">
                Active Companies
              </CardTitle>
              <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                <Building2 className="h-5 w-5 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">
                {totalCompanies}
              </div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400 font-medium">+8.2%</span>
                <span className="text-violet-400 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-violet-200 group-hover:text-violet-100 transition-colors">
                Total Interviewers
              </CardTitle>
              <div className="p-2 bg-emerald-600/20 rounded-lg group-hover:bg-emerald-600/30 transition-colors">
                <UserCheck className="h-5 w-5 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">
                {totalInterviewers}
              </div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400 font-medium">+15.3%</span>
                <span className="text-violet-400 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:border-violet-400/50 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-violet-200 group-hover:text-violet-100 transition-colors">
                Active Subscriptions
              </CardTitle>
              <div className="p-2 bg-orange-600/20 rounded-lg group-hover:bg-orange-600/30 transition-colors">
                <CreditCard className="h-5 w-5 text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">
                {totalSubscriptions}
              </div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400 font-medium">+6.1%</span>
                <span className="text-violet-400 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-left duration-700 delay-400">
          
          {/* Revenue Chart */}
          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl">
                <div className="p-2 bg-violet-600/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-violet-400" />
                </div>
                Revenue Trends
              </CardTitle>
              <CardDescription className="text-violet-300">
                Monthly revenue breakdown from subscriptions and interviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickFormatter={(value) => `$${value/1000}k`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      color: '#ffffff'
                    }}
                    labelStyle={{ color: '#e9d5ff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#8b5cf6" 
                    fill="url(#colorRevenue)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Growth Chart */}
          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                User Growth
              </CardTitle>
              <CardDescription className="text-violet-300">
                Monthly growth of companies and interviewers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      color: '#ffffff'
                    }}
                    labelStyle={{ color: '#e9d5ff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="companies" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                    name="Companies"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="interviewers" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                    name="Interviewers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-right duration-700 delay-600">
          
          {/* Subscription Distribution */}
          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <CreditCard className="h-5 w-5 text-orange-400" />
                </div>
                Subscription Plans
              </CardTitle>
              <CardDescription className="text-violet-300">
                Distribution of active subscription plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={subscriptionDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {subscriptionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      color: '#ffffff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl">
                <div className="p-2 bg-violet-600/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-violet-400" />
                </div>
                Revenue Breakdown
              </CardTitle>
              <CardDescription className="text-violet-300">
                Comparison of subscription vs interview revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickFormatter={(value) => `$${value/1000}k`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      color: '#ffffff'
                    }}
                    labelStyle={{ color: '#e9d5ff' }}
                  />
                  <Bar dataKey="subscriptions" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Subscriptions" />
                  <Bar dataKey="interviews" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Interviews" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom duration-700 delay-800">
          
          {/* Recent Companies */}
          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Building2 className="h-5 w-5 text-blue-400" />
                </div>
                Recent Companies
              </CardTitle>
              <CardDescription className="text-violet-300">
                Latest company registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCompanies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-4 rounded-xl bg-black/30 hover:bg-black/50 transition-all duration-200 border border-violet-500/10 hover:border-violet-500/30">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-violet-500/20">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${company.name}&background=8b5cf6&color=fff`} />
                        <AvatarFallback className="bg-violet-600 text-white font-semibold">
                          {company.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-semibold text-lg">{company.name}</p>
                        <p className="text-violet-300 text-sm">{company.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={company.status === 'active' ? 'default' : 'secondary'}
                        className={company.status === 'active' 
                          ? 'bg-green-600/80 hover:bg-green-600 text-white border-green-500/50' 
                          : 'bg-yellow-600/80 hover:bg-yellow-600 text-white border-yellow-500/50'
                        }
                      >
                        {company.status}
                      </Badge>
                      <p className="text-violet-400 text-sm mt-1 font-medium">{company.plan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Interviewers */}
          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                Top Interviewers
              </CardTitle>
              <CardDescription className="text-violet-300">
                Highest rated interviewers this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topInterviewers.map((interviewer) => (
                  <div key={interviewer.id} className="flex items-center justify-between p-4 rounded-xl bg-black/30 hover:bg-black/50 transition-all duration-200 border border-violet-500/10 hover:border-violet-500/30">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-violet-500/20">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${interviewer.name}&background=a78bfa&color=fff`} />
                        <AvatarFallback className="bg-violet-500 text-white font-semibold">
                          {interviewer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-semibold text-lg">{interviewer.name}</p>
                        <p className="text-violet-300 text-sm">{interviewer.expertise}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-400 mb-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-white font-semibold">{interviewer.rating}</span>
                      </div>
                      <p className="text-violet-400 text-sm">{interviewer.interviews} interviews</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl animate-in slide-in-from-bottom duration-700 delay-1000">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-xl">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <Activity className="h-5 w-5 text-emerald-400" />
              </div>
              Recent Transactions
            </CardTitle>
            <CardDescription className="text-violet-300">
              Latest payments and subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-violet-500/20">
                    <th className="text-left py-4 text-violet-200 font-semibold text-sm uppercase tracking-wider">Company</th>
                    <th className="text-left py-4 text-violet-200 font-semibold text-sm uppercase tracking-wider">Amount</th>
                    <th className="text-left py-4 text-violet-200 font-semibold text-sm uppercase tracking-wider">Type</th>
                    <th className="text-left py-4 text-violet-200 font-semibold text-sm uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 text-violet-200 font-semibold text-sm uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-violet-500/10 hover:bg-black/30 transition-colors duration-200">
                      <td className="py-4 text-white font-medium">{transaction.company}</td>
                      <td className="py-4 text-white font-bold text-lg">${transaction.amount.toLocaleString()}</td>
                      <td className="py-4 text-violet-300">{transaction.type}</td>
                      <td className="py-4">
                        <Badge 
                          variant={transaction.status === 'PAID' ? 'default' : 'secondary'}
                          className={transaction.status === 'PAID' 
                            ? 'bg-green-600/80 hover:bg-green-600 text-white border-green-500/50' 
                            : 'bg-yellow-600/80 hover:bg-yellow-600 text-white border-yellow-500/50'
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="py-4 text-violet-400">{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminDashboard;