"use client";

import { Button } from "@/components/ui/button";
import {
  Monitor,
  Smartphone,
  Laptop,
  Cloud,
  Shield,
  Zap,
  Users,
  Download,
  Play,
  ChevronRight,
  Menu,
  Calendar,
  Mail,
  FileText,
  Settings,
  Search,
  User,
  Folder,
  Image,
  Music,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CloudOS
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </a>
              <Button variant="outline" className="mr-2" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button>Get Started</Button>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Next-Generation Cloud Operating System
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    Your Desktop
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Anywhere
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Experience the future of computing with CloudOS - a complete
                  operating system that runs in your browser. Access your files,
                  apps, and workspace from any device, anywhere.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Demo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download App
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">50k+ users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.9/5 rating</span>
                </div>
              </div>
            </motion.div>

            {/* Right - OS Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Desktop Frame */}
              <div className="relative bg-gray-900 rounded-lg p-1 shadow-2xl">
                {/* Window Controls */}
                <div className="bg-gray-800 rounded-t-lg px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-sm">CloudOS Desktop</div>
                  <div className="w-16"></div>
                </div>

                {/* Desktop Environment */}
                <div
                  className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-b-lg relative overflow-hidden"
                  style={{ height: "500px" }}
                >
                  {/* Taskbar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 px-4 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/10"
                        >
                          <Search className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center space-x-1">
                          {[
                            Folder,
                            FileText,
                            Image,
                            Music,
                            Video,
                            Settings,
                          ].map((Icon, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10"
                              >
                                <Icon className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div className="text-white text-sm">2:30 PM</div>
                    </div>
                  </div>

                  {/* Floating Windows */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute top-8 left-8 bg-white rounded-lg shadow-xl overflow-hidden"
                    style={{ width: "200px", height: "150px" }}
                  >
                    <div className="bg-gray-100 px-3 py-2 border-b flex items-center justify-between">
                      <span className="text-sm font-medium">File Explorer</span>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>Documents</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Folder className="w-4 h-4 text-blue-500" />
                        <span>Pictures</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span>Report.pdf</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="absolute top-12 right-8 bg-white rounded-lg shadow-xl overflow-hidden"
                    style={{ width: "180px", height: "120px" }}
                  >
                    <div className="bg-blue-500 px-3 py-2 text-white text-sm font-medium">
                      Weather App
                    </div>
                    <div className="p-3 text-center">
                      <div className="text-2xl font-bold">72°</div>
                      <div className="text-sm text-gray-600">Sunny</div>
                      <div className="text-xs text-gray-500 mt-1">New York</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute bottom-20 left-12 bg-green-500 text-white p-3 rounded-lg shadow-lg text-sm"
                    style={{ width: "160px" }}
                  >
                    <div className="font-medium mb-1">System Update</div>
                    <div className="text-green-100 text-xs">
                      Your system is up to date!
                    </div>
                  </motion.div>

                  {/* Floating Action Icons */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-16 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Cloud className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-12 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need in a modern OS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CloudOS brings the power of a complete desktop environment to the
              cloud, with all the applications and tools you need for
              productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Monitor,
                title: "Cross-Platform",
                description:
                  "Works on any device with a web browser. No installation required.",
              },
              {
                icon: Cloud,
                title: "Cloud Storage",
                description:
                  "Your files are automatically synced and accessible from anywhere.",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description:
                  "Enterprise-grade security with end-to-end encryption.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to experience the future?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already made the switch to
              CloudOS. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg"
              >
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600"
              >
                Watch Demo
                <Play className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
