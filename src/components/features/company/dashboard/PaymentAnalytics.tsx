  import React from 'react';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import { Badge } from '@/components/ui/badge';
  import { Progress } from '@/components/ui/progress';
  import { DollarSign, CreditCard, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
  import { IPaymentTransaction } from '@/types/IJob';
  
  interface PaymentAnalyticsProps {
    payments: IPaymentTransaction[];
  }
  
  export function PaymentAnalytics({ payments }: PaymentAnalyticsProps) {
    const paidPayments = payments.filter(payment => payment.status === 'PAID');
    const pendingPayments = payments.filter(payment => payment.status === 'PENDING');
    const failedPayments = payments.filter(payment => payment.status === 'FAILED');
    
    const totalSpent = paidPayments.reduce((sum, payment) => sum + payment.finalPayableAmount, 0);
    const totalPending = pendingPayments.reduce((sum, payment) => sum + payment.finalPayableAmount, 0);
    const averagePerTransaction = paidPayments.length > 0 ? totalSpent / paidPayments.length : 0;
    
    const totalCandidatesInterviewed = paidPayments.reduce((sum, payment) => sum + payment.candidatesCount, 0);
    const averageCostPerCandidate = totalCandidatesInterviewed > 0 ? totalSpent / totalCandidatesInterviewed : 0;
  
    // Monthly spending (mock data for chart)
    const monthlySpending = [
      { month: 'Nov', amount: 850 },
      { month: 'Dec', amount: 1200 }, 
      { month: 'Jan', amount: Math.round(totalSpent) }
    ];
  
    return (
      <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        {/* Payment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-green-400/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalSpent.toLocaleString()}</div>
              <p className="text-xs text-gray-400">
                {paidPayments.length} completed transactions
              </p>
            </CardContent>
          </Card>
  
          <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-yellow-400/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalPending.toLocaleString()}</div>
              <p className="text-xs text-gray-400">
                {pendingPayments.length} pending transactions
              </p>
            </CardContent>
          </Card>
  
          <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-blue-400/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Avg per Transaction</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${Math.round(averagePerTransaction).toLocaleString()}</div>
              <p className="text-xs text-gray-400">
                Based on {paidPayments.length} transactions
              </p>
            </CardContent>
          </Card>
  
          <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-violet-400/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Cost per Candidate</CardTitle>
              <TrendingUp className="h-4 w-4 text-violet-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${Math.round(averageCostPerCandidate)}</div>
              <p className="text-xs text-gray-400">
                {totalCandidatesInterviewed} candidates interviewed
              </p>
            </CardContent>
          </Card>
        </div>
  
        {/* Monthly Spending Trend */}
        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-violet-400" />
              Monthly Spending Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlySpending.map((month, index) => {
                const maxAmount = Math.max(...monthlySpending.map(m => m.amount));
                const percentage = (month.amount / maxAmount) * 100;
                
                return (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-gray-300 w-12">{month.month}</span>
                    <div className="flex items-center gap-4 flex-1 ml-4">
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${percentage}%`,
                            animationDelay: `${index * 0.2}s`
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-300 min-w-[80px] text-right">
                        ${month.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
  
        {/* Recent Transactions */}
        {/* <Card className="bg-black/40 backdrop-blur-md border-violet-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CreditCard className="h-5 w-5 text-violet-400" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.slice(0, 5).map((payment, index) => (
                <div 
                  key={payment._id}
                  className="flex items-center justify-between p-4 bg-violet-950/30 rounded-lg border border-violet-500/20 hover:border-violet-400/40 transition-all duration-200"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      payment.status === 'PAID' ? 'bg-green-500/20 text-green-400' :
                      payment.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {payment.status === 'PAID' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {payment.candidatesCount} candidates interviewed
                      </p>
                      <p className="text-sm text-gray-400">
                        ${payment.pricePerInterview} per interview
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">
                      ${payment.finalPayableAmount.toLocaleString()}
                    </div>
                    <Badge 
                      variant={payment.status === 'PAID' ? 'default' : payment.status === 'PENDING' ? 'secondary' : 'destructive'}
                      className={`text-xs ${
                        payment.status === 'PAID' 
                          ? 'bg-green-900/50 text-green-200 border-green-500/30'
                          : payment.status === 'PENDING' 
                          ? 'bg-yellow-900/50 text-yellow-200 border-yellow-500/30'
                          : 'bg-red-900/50 text-red-200 border-red-500/30'
                      }`}
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    );
  }