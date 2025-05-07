"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface RevenueByPlanProps {
  data: {
    plan: string;
    value: number;
  }[];
}

export function RevenueByPlanChart({ data }: RevenueByPlanProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Plan</CardTitle>
        <CardDescription>
          Distribution of revenue across different membership plans
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="plan" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [
                  `$${value}`, 'Revenue'
                ]}
              />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface MembershipDistributionProps {
  data: {
    plan: string;
    value: number;
  }[];
}

export function MembershipDistributionChart({ data }: MembershipDistributionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Distribution</CardTitle>
        <CardDescription>
          Active subscriptions by plan type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [
                  `${value} members`, 'Count'
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface MonthlyRevenueProps {
  data: {
    month: string;
    revenue: number;
  }[];
}

export function MonthlyRevenueChart({ data }: MonthlyRevenueProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>
          Revenue trends over the past 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [
                  `$${value}`, 'Revenue'
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
