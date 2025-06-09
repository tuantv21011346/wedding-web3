import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-purple-50 to-pastel-pink-50">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-pastel-purple-800 mb-4">
          Test Page
        </h1>
        <p className="text-gray-600">
          Trang này hoạt động bình thường. Nếu bạn thấy trang này, React Router đang hoạt động.
        </p>
        <div className="mt-8 space-y-4">
          <div className="text-sm text-gray-500">
            <p>Current time: {new Date().toLocaleString()}</p>
            <p>React is working ✅</p>
            <p>TypeScript is working ✅</p>
            <p>Tailwind CSS is working ✅</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
